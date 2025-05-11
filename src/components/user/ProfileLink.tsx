import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileLinkProps {
  imgUrl: string;
  title: string;
  href?: string;
}
const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
  return (
    <div className="flex-center gap-2">
      <Image src={imgUrl} alt={title} width={20} height={20} />
      {href ? (
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link-100 paragraph-medium"
        >
          {title}
        </Link>
      ) : (
        <p className="text-dark400_light700 paragraph-medium">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
