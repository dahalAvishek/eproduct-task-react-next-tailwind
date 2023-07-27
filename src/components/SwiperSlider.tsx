import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { Product } from "@/module/product_module";
interface Props {
  product: Product;
}

const SwiperSlider = ({ product }: Props) => {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      className="w-full h-full"
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      loop={true}
    >
      {product.image.map((imageItem) => (
        <SwiperSlide>
          <Image
            src={imageItem}
            alt="Product Image"
            fill
            sizes="(max-width: 768px) 100vw, 700px"
            objectFit="contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperSlider;
