import Tag from '../../models/tag';

export const list = async (ctx) => {
  try {
    const tag = await Tag.find({}).exec();
    const tagList = tag.map((data) => data.tag);
    ctx.body = tagList;
  } catch (e) {
    ctx.throw(500, e);
  }
};
