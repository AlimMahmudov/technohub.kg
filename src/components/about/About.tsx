import React from "react";
import { Title } from "../ui/text/Title";
import { TitleComponent } from "../ui/text/TitleComponent";
import { Description } from "../ui/text/Description";
import Image from "next/image";
import about_image from "@/shared/image/about_image.avif";

const About = () => {
  return (
    <div className="container">
      <div className="w-full py-2 md:px-5 px-0">
        <div className="p-3 mt-[14px]">
          <Title>О магазине TechnoHub.kg</Title>
          <Description>
            Уважаемые покупатели, ниже вы можете ознакомиться со сроками
            гарантии и адресами сервис-центров
          </Description>
        </div>
      </div>
      <div className="w-full py-2 md:px-5 px-0">
        <div className="w-full flex flex-col gap-3 p-3">
          <div className="w-full h-[280px] md:h-[300px] rounded-[10px] overflow-hidden">
            <Image
              className="object-cover w-full h-full"
              src={about_image}
              alt="product"
              quality={100} // Максимальное качество (по умолчанию 75)
              placeholder="blur" // Размытие при загрузке (если поддерживается)
            />
          </div>
        </div>
      </div>
      <div className="w-full py-2 md:px-5 px-0">
        <div className="w-full flex flex-col gap-3 mb-10 p-3">
          <TitleComponent>Наша история</TitleComponent>
          <Description>
            «Чтобы написать по-настоящему честный текст, мне потребовалось
            больше трех лет. Казалось бы, что может быть проще, чем рассказать,
            кто ты? Но мне хотелось донести душу проекта, а не написать клише о
            красивых и свежих цветах.
          </Description>
          <Description>
            И да, я совсем забыла представиться. Я — Рахат. Мама цветочной
            мастерской Flower Buro.
          </Description>
          <Description>
            А теперь к главному — что есть Flower Buro и какая наша история.
            Начиная делать свои первые букеты, мне хотелось, чтобы те, кто их
            получал, испытывали не только чувство радости и праздника, но и
            смысл каждого букета, чтоб рассматривали их как целостную картину.
            Самое важное в наших букетах — это фирменный стиль Flower Buro,
            который читается сразу и приводит в восторг как заказчиков, так и
            получателей. С момента приобретения цветочного бюро прошло 3,5 года.
            Поменялись наши букеты, они стали глубже и интереснее, состав —
            разнообразнее и богаче. И на сегодняшний день мы еще больше укрепили
            позиции своим видением современной коммерческой флористики. И да, я
            совсем забыла представиться. Я — Рахат. Мама цветочной мастерской
            Flower Buro.
          </Description>
        </div>
      </div>
    </div>
  );
};

export default About;
