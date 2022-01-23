import { Comment } from './comments.entity';

describe('CommentsEntity', () => {
  it('should be defined', () => {
    expect(new Comment()).toBeDefined();
  });
});
