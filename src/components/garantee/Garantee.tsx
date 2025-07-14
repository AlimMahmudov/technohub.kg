import React from "react";
import { Title } from "../ui/text/Title";
import { TitleComponent } from "../ui/text/TitleComponent";
import { Description } from "../ui/text/Description";

const Garantee = () => {
  return (
    <div className="container">
      <div className="w-full py-2 md:px-5 px-0">
        <div className="p-3 mt-[14px]">
          <Title>Гарантийное обслуживание в Бишкеке, Кыргызстане</Title>
          <Description>
            Уважаемые покупатели, ниже вы можете ознакомиться со сроками
            гарантии и адресами сервис-центров
          </Description>
        </div>
      </div>
      <div className="w-full py-2 md:px-5 px-0">
        <div className="w-full flex flex-col gap-3 p-3">
          <TitleComponent>Сроки гарантии:</TitleComponent>
          <Description>
            Мобильные телефоны - 1-3 месяцев (в зависимости от производителя)
            Электроника - 3-12 месяцев (в зависимости от производителя)
            Компьютерная техника - 3-12 месяцев (в зависимости от производителя)
            Бытовая техника - 3-25 месяцев (в зависимости от производителя)
            Красота и Здоровье - 3-12 месяцев (в зависимости от производителя)
            Дом, Сад, Ремонт - 12 месяцев Часы - 12 месяцев Электронные
            аксессуары - 14 дней - 12 месяцев (в зависимости от производителя)
          </Description>
        </div>
      </div>
      <div className="w-full py-2 md:px-5 px-0">
        <div className="w-full flex flex-col gap-3 mb-10 p-3">
          <TitleComponent>
            Адреса авторизованных сервисных центров:
          </TitleComponent>
          <Description>
            Гарантийный ремонт и сервис мобильных телефонов SAMSUNG осуществляет
            авторизованный сервисный центр &quot;Кристалл&quot; по адресу:
            г.Бишкек, ул. Медерова, 8/1, пер. Юнусалиева тел: (0312) 908835
            (36); (0550) 879988
          </Description>
          <Description>
            Орбита сервис — авторизованный сервис центр Samsung, Redmond,
            Russell Hobbs Г. Бишкек, ул Жибек Жолу 167/ Буденова, тел: 362653
            Гарантийный и пост гарантийный ремонт всей оригинальной продукции
            Sony
          </Description>
          <Description>
            Сервис Центр «Акмарал» - авторизованный сервис центр. г.Бишкек, 7
            мкр 56 д Гарантийный и пост гарантийный ремонт продукции
            производителей LG, Panasonic, Samsung (ремонт всего спектра
            продукции) тел: 530677, 533717
          </Description>
          <Description>
            IT Solutions – авторизованный сервис центр Asus, Toshiba (Обед
            13:00-14:00, Суб до 12:00) г. Бишкек, Сыдыкова 178, тел: 0552462626,
            462626 Гарантийный и пост гарантийный ремонт всей оригинальной
            продукции Asus, Toshiba.
          </Description>
          <Description>
            Сервисный Центр «КомпМастер» - авторизованный сервис центр Acer, г.
            Бишкек, Восток-5 д.18-62 тел: 0555 543345 Гарантийный и пост
            гарантийный ремонт всей оригинальной продукции Acer
          </Description>
          <Description>
            Сервис Центр “Continent” - авторизованный сервис центр HP –
            ноутбуков (Hewlett—Packard) г.Бишкек, Интергельпо 1 (бывший завод
            Фрунзе) тел: 65-55-56
          </Description>
          <Description>
            Сервис центр &quot;Sinbo&quot; - ул.Курманджан Датка 246 тел: 0550
            200 680
          </Description>
          <Description>
            Авторизованный сервис центр Gorenje г.Бишкек, ул Л.Толстого 2Г
            /Тыныстанова, тел: 903727, 591010
          </Description>
        </div>
      </div>
    </div>
  );
};

export default Garantee;
