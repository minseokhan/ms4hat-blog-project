import Post from '../../models/post';
import Tag from '../../models/tag';
import User from '../../models/user';
import mongoose from 'mongoose';
import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const { ObjectId } = mongoose.Types;

export const getPostById = async (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  try {
    const post = await Post.findById(id);
    // 포스트가 존재하지 않을 때
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.state.post = post;
    return next();
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const checkOwnPost = (ctx, next) => {
  const { user, post } = ctx.state;
  if (post.user._id.toString() !== user._id) {
    ctx.status = 403;
    return;
  }
  return next();
};

/*
  POST /api/posts
  {
    title: '제목',
    body: '내용',
    tags: ['태그1', '태그2']
  }
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    imageUrl: Joi.string(),
  });

  // 검증 후, 검증 실패시 에러처리
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags, imageUrl } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user: ctx.state.user,
    imageUrl,
  });
  try {
    let i = 0;
    for (i in tags) {
      const tagName = tags[i];
      const checkTag = await Tag.findOne({ 'tag.name': tagName });
      if (checkTag) {
        const nextData = {
          'tag.num': checkTag.tag.num + 1,
        };
        await Tag.findByIdAndUpdate(checkTag._id, nextData, {
          new: true,
        }).exec();
      } else {
        const tagss = new Tag({
          'tag.name': tagName,
        });
        await tagss.save();
      }
    }
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// html 을 없애고 내용이 너무 길으면 200자로 제한시키는 함수
const removeHtmlAndShorten = (body, num) => {
  const filtered = sanitizeHtml(body, {
    allowedTags: [],
  });
  return filtered.length < num ? filtered : `${filtered.slice(0, num)}...`;
};

/*
  GET /api/posts?username=&tag=&page=
*/
export const list = async (ctx) => {
  // query 는 문자열이기 때문에 숫자로 변환해주어야합니다.
  // 값이 주어지지 않았다면 1 을 기본으로 사용합니다.
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }

  const { tag, username } = ctx.query;
  const query = {
    ...(username ? { 'user.username': username } : {}),
    ...(tag ? { tags: tag } : {}),
  };

  try {
    const posts = await Post.find(query)
      .sort({ _id: -1 })
      .limit(6)
      .skip((page - 1) * 6)
      .lean()
      .exec();
    const postCount = await Post.countDocuments(query).exec();
    ctx.set('Last-Page', Math.ceil(postCount / 6));
    ctx.body = posts.map((post) => ({
      ...post,
      title: removeHtmlAndShorten(post.title, 23),
      body: removeHtmlAndShorten(post.body, 90),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  GET /api/posts/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    if (ctx.state.user) {
      const user = await User.findById(ctx.state.user._id).exec();
      const likePostArray = user.likePost;
      let likeBolean = false;
      let i;
      for (i in likePostArray) {
        if (likePostArray[i] === id) {
          likeBolean = true;
        }
      }
      ctx.body = {
        like: likeBolean,
        post: ctx.state.post,
        likePostNum: ctx.state.post.likeHeart,
      };
    } else {
      ctx.body = {
        like: false,
        post: ctx.state.post,
        likePostNum: null,
      };
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const viewer = async (ctx) => {
  const { id } = ctx.params;
  const nextData = { ...ctx.request.body };
  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true,
    }).exec();
    const viewer = post.viewer;
    ctx.body = viewer;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    const tags = post.tags;
    let i;
    for (i in tags) {
      const checkTag = await Tag.findOne({ 'tag.name': tags[i] });
      const nextData = { 'tag.num': checkTag.tag.num - 1 };
      await Tag.findOneAndUpdate({ 'tag.name': tags[i] }, nextData, {
        new: true,
      }).exec();
      const confirmTag = await Tag.findOne({ 'tag.name': tags[i] });
      if (confirmTag.tag.num === 0) {
        await Tag.findOneAndRemove({ 'tag.name': tags[i] }).exec();
      }
    }
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공은 했지만 응답할 데이터는 없음)
  } catch (e) {
    ctx.throw(500, e);
  }
};

/*
  PATCH /api/posts/:id
  {
    title: '수정',
    body: '수정 내용',
    tags: ['수정', '태그']
  }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;
  // write 에서 사용한 schema 와 비슷한데, required() 가 없습니다.
  const schema = Joi.object().keys({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    imageUrl: Joi.string(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const nextData = { ...ctx.request.body };

  try {
    const post = await Post.findByIdAndUpdate(id, nextData, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const recent = async (ctx) => {
  try {
    const recentPost = await Post.find({}).sort({ _id: -1 }).limit(3).exec();
    ctx.body = recentPost.map((post) => ({
      ...post,
      body: removeHtmlAndShorten(post.body, 45),
    }));
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const likeHeart = async (ctx) => {
  const { postId, userId } = ctx.params;
  try {
    const checkPost = await Post.findOne({ _id: postId });
    const checkUser = await User.findOne({ _id: userId });
    const likeHeartCancel = checkUser.likePost.find((data) => data === postId);

    if (likeHeartCancel) {
      await Post.findByIdAndUpdate(
        postId,
        { likeHeart: checkPost.likeHeart - 1 },
        { new: true },
      ).exec();
      await User.findByIdAndUpdate(
        userId,
        { likePost: checkUser.likePost.remove(postId) },
        { new: true },
      ).exec();
      ctx.body = {
        likePostNum: checkPost.likeHeart - 1,
        likeboolean: false,
      };
    } else {
      await Post.findByIdAndUpdate(
        postId,
        { likeHeart: checkPost.likeHeart + 1 },
        { new: true },
      ).exec();
      await User.findByIdAndUpdate(
        userId,
        { likePost: checkUser.likePost.concat(postId) },
        { new: true },
      ).exec();
      ctx.body = {
        likePostNum: checkPost.likeHeart + 1,
        likeboolean: true,
      };
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};
