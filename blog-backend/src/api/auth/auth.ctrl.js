require('dotenv').config();
import Joi from 'joi';
import User from '../../models/user';

export const register = async ctx => {
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required(),
  });

  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { username, password } = ctx.request.body;

  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; //Conflict
      return;
    }

    const user = new User({
      username,
    });

    await user.setPassword(password);
    await user.save();

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

let admin = false;

export const login = async ctx => {
  const { username, password } = ctx.request.body;
  const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

  if (!username || !password) {
    ctx.status = 401; //Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      ctx.status = 401;
      return;
    }
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      admin = true;
    } else {
      admin = false;
    }
    ctx.body = {
      auth: user.serialize(),
    };

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const check = async ctx => {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    return;
  }
  ctx.body = { user, admin };
};

export const logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; //No Content
};

// export const likeupdate = async ctx => {
//   const { id } = ctx.params;
//   const postId = ctx.request.body;
//   try {
//     const user = await User.findById(id);
//     ctx.body = user;
//     console.log(post);
//     if (!post) {
//       ctx.status = 404;
//       return;
//     }
//   } catch (e) {
//     ctx.throw(500, e);
//   }
// };
