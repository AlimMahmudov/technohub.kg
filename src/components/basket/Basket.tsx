"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import img from "@/assets/images/basket-null.png";
import { Title } from "../ui/text/Title";
import { TitleComponent } from "../ui/text/TitleComponent";
import { toast, ToastContainer } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

interface BasketItem {
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    articles: string | null;
    laptop_image: { image: string }[];
    printer_image: { image: string }[];
  };
}

interface IMessage {
  phone_number: string;
  full_name: string;
  email: string;
  description: string;
}

const Basket = () => {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<IMessage>();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("basket") || "[]");
    setBasket(cart);
  }, []);

  const updateLocalStorage = (updatedBasket: BasketItem[]) => {
    setBasket(updatedBasket);
    localStorage.setItem("basket", JSON.stringify(updatedBasket));
  };

  const handleIncrement = (productId: number) => {
    const updated = basket.map((item) =>
      item.product_id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
    updateLocalStorage(updated);
  };

  const handleDecrement = (productId: number) => {
    const updated = basket.map((item) =>
      item.product_id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );
    updateLocalStorage(updated);
  };

  const handleDelete = (productId: number) => {
    const updated = basket.filter((item) => item.product_id !== productId);
    updateLocalStorage(updated);
  };

  const total = basket.reduce((sum, item) => {
    const price =
      item.product.discount > 0
        ? Math.round(item.product.price * (1 - item.product.discount / 100))
        : item.product.price;

    return sum + price * item.quantity;
  }, 0);

  const onSubmit: SubmitHandler<IMessage> = async (formData) => {
    if (!basket.length) return;

    setIsSubmitting(true);

    const productsText = basket
      .map(
        (product) => `
${product.product.articles ? "💻" : "🖨️"} ${product.product.name}
${product.product.articles ? `📑 Артикул: ${product.product.articles}` : ""}
Количество: ${product.quantity} шт.
------------------------------`,
      )
      .join("\n");

    const text = `
🛒 Новая заявка из корзины

👤 Имя: ${formData.full_name}
📞 Телефон: ${formData.phone_number}
📧 Email: ${formData.email || "Не указан"}
💬 Сообщение: ${formData.description}

💰 Общая сумма: ${total} сом

${productsText}
`;

    try {
      await fetch(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
            text,
          }),
        },
      );

      reset();
      localStorage.removeItem("basket");

      toast.success(
        "✅ Спасибо! Ваша заявка успешно отправлена. Наш менеджер скоро свяжется с вами.",
        {
          position: "top-right",
          autoClose: 2500,
          style: {
            background: "#16a34a",
            color: "#ffffff",
          },
          onClose: () => {
            setBasket([]);
            router.push("/");
          },
        },
      );
    } catch {
      toast.error("Ошибка отправки");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer theme="colored" />

      {!basket.length ? (
        <div className="container pt-[120px] pb-16 flex flex-col items-center">
          <Image src={img} alt="empty" width={400} />
          <h1 className="text-[32px] text-gray-500 mt-4">Корзина пуста</h1>
        </div>
      ) : (
        <div className="container pt-[120px] pb-16">
          <Title className="pt-3">Корзина</Title>

          <div className="flex flex-col gap-4 mt-6">
            {basket.map((el) => {
              const price =
                el.product.discount > 0
                  ? Math.round(
                      el.product.price * (1 - el.product.discount / 100),
                    )
                  : el.product.price;

              return (
                <div
                  key={el.product_id}
                  className="bg-white rounded-2xl p-4 shadow-sm border"
                >
                  <div className="flex gap-5 items-center">
                    <Image
                      src={
                        el.product.laptop_image?.[0]?.image ||
                        el.product.printer_image?.[0]?.image
                      }
                      width={120}
                      height={90}
                      alt="product"
                      className="rounded-lg object-cover"
                    />

                    <div className="w-full">
                      <h2 className="text-lg font-medium">{el.product.name}</h2>

                      <TitleComponent>{price * el.quantity} сом</TitleComponent>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border rounded-lg overflow-hidden">
                          <button
                            type="button"
                            className="px-3 py-1"
                            onClick={() => handleDecrement(el.product_id)}
                          >
                            –
                          </button>

                          <span className="px-4">{el.quantity}</span>

                          <button
                            type="button"
                            className="px-3 py-1"
                            onClick={() => handleIncrement(el.product_id)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          className="text-red-500 text-sm"
                          onClick={() => handleDelete(el.product_id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 bg-white rounded-2xl p-6 shadow-sm border">
            <h2 className="text-xl font-semibold">Итого: {total} сом</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 bg-white rounded-2xl p-6 shadow-sm border flex flex-col gap-4"
          >
            <input
              className="border rounded-lg px-4 py-2"
              placeholder="Имя"
              {...register("full_name")}
            />

            <input
              className="border rounded-lg px-4 py-2"
              placeholder="Телефон"
              {...register("phone_number")}
            />

            <input
              className="border rounded-lg px-4 py-2"
              placeholder="Email"
              {...register("email")}
            />

            <textarea
              className="border rounded-lg px-4 py-2"
              placeholder="Сообщение"
              rows={4}
              {...register("description")}
            />

            <button
              disabled={isSubmitting}
              className="bg-black text-white py-3 rounded-xl disabled:opacity-50"
            >
              {isSubmitting ? "Отправка..." : "Отправить"}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Basket;
