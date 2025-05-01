interface Tag {
  _id: string;
  name: string;
}

interface Author {
  _id: string;
  name: string;
  image: string;
}

interface QuestionProps {
  _id: string;
  title: string;
  tags: Tag[];
  createdAt: Date;
  author: Author;
  upvotes: number;
  answers: number;
  views: number;
}

export { QuestionProps, Tag, Author };
