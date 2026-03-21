import Image from "next/image";

type Props = {
  src: string;
  title: string;
  rotation?: number;
};

export function WorkCard({ src, title, rotation = 0 }: Props) {
  return (
    <div
      className="ap-group ap-relative ap-cursor-pointer"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="ap-relative ap-overflow-hidden ap-rounded-xl ap-shadow-lg ap-transition-all ap-duration-300 group-hover:ap-shadow-2xl group-hover:ap-scale-105 group-hover:ap-rotate-0">
        <Image
          src={src}
          alt={title}
          width={600}
          height={600}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="ap-w-full ap-h-auto ap-object-cover ap-transition-transform ap-duration-500 group-hover:ap-scale-110"
        />
        {/* Hover overlay with title */}
        <div className="ap-absolute ap-inset-0 ap-bg-gradient-to-t ap-from-black/70 ap-via-black/20 ap-to-transparent ap-opacity-0 ap-transition-opacity ap-duration-300 group-hover:ap-opacity-100 ap-flex ap-items-end ap-p-4">
          <p className="ap-text-white ap-font-bold ap-text-lg ap-translate-y-4 ap-transition-transform ap-duration-300 group-hover:ap-translate-y-0">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
