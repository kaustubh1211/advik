import Image from "next/image";
import Link from "next/link";

const SidebarBanner = ({ image, imgWidth, imgHeight }) => {
  return (
    <div className="widget ltn__banner-widget">
      <Link href="/shop">
        <Image
          src={image ? image : "/img/makar sankranti/15.png"}
          alt="Banner Image"
          width={imgWidth ? imgWidth : 565}
          height={imgHeight ? imgHeight : 550}
        />
      </Link>
    </div>
  );
};

export default SidebarBanner;
