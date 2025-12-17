import SeparatorHorizontal from "@/components/SeparatorHorizontal";
import Image from "next/image";
import BlogPostMetaData from "./BlogPostMetaData";
import BlogPostTitle from "./BlogPostTitle";

interface BlogPostDetailHeaderProps {
  title: string;
  date: string;
  authorImage: string;
  authorName: string;
  category: string;
  readTime: number;
  imageUrl: string;
}

export default function BlogPostDetailHeader({
  title,
  date,
  authorImage,
  authorName,
  category,
  readTime,
  imageUrl,
}: BlogPostDetailHeaderProps) {
  return (
    <>
      <div className="relative">
        <Image
          alt={title}
          src={imageUrl}
          width={1000}
          height={500}
          className="h-auto max-h-96 w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1000px"
          priority
        />
        <BlogPostMetaData
          authorImage={authorImage}
          authorName={authorName}
          date={date}
          category={category}
          readTime={readTime}
        />
      </div>
      <SeparatorHorizontal short={true} />
      <BlogPostTitle
        title={title}
        textStyleClassName="text-2xl font-semibold md:text-3xl"
        gridId="grid-blog-post-heading"
      />
      <SeparatorHorizontal short={true} />
    </>
  );
}
