import Image from "next/image";

type Props = {
  src: string;
  title: string;
  rotation?: number;
};

export function WorkCard({ src, title, rotation = 0 }: Props) {
  return (
    <div
      className="group relative cursor-pointer"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105 group-hover:rotate-0">
        <Image
          src={src}
          alt={title}
          width={600}
          height={600}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Hover overlay with title */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end p-4">
          <p className="text-white font-bold text-lg translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
}
