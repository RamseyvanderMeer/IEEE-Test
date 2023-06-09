import React from "react";
import type { RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper";

type EventWithUser = RouterOutputs["events"]["getAll"][number];
export const EventView = (props: EventWithUser) => {

  const { event } = props;
    return (
      <>
        <div
          key={event.id}
          className="overflow-x-none flex w-full flex-col gap-3 border-b border-slate-400 p-4"
        >
          <div className="relative flex w-full flex-row items-center justify-between">
            <Link href={`event/${event.id}`} className="text-2xl font-bold">
              {event.name}
            </Link>

            <div className="relative flex flex-row items-center">
              <span className="font-thin">{` ${event.date.toLocaleDateString()} · ${dayjs(
                event.date
              ).fromNow()}`}</span>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-between md:flex-row">
            <p className="md:w-5/12 text-white">{event.description}</p>

            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper relative h-48 w-full md:w-6/12 bg-slate-300 text-white"
            >
              {event?.images.map((image, idx) => (
                <SwiperSlide key={`${image}-${idx}`}>
                  <Image
                    alt={image}
                    src={image}
                    fill
                    className="w-full overflow-hidden object-cover object-center"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </>
    );
};
