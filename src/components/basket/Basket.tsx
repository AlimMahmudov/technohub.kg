"use client";
import {
  useGetBasketQuery,
  useDeleteBasketMutation,
  useUpdateQuantityMutation,
} from "@/redux/api/laptop";
import { Title } from "../ui/text/Title";
import Image from "next/image";
import img from "@/assets/images/basket-null.png";
import TextSkeleton from "../skeleton/TextSkeleton";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { TitleComponent } from "../ui/text/TitleComponent";

interface IMessage {
  phone_number: string;
  full_name: string;
  email: string;
  description: string;
  products: {
    id: number;
    quantity: number;
  }[];
}

const Basket = () => {
  const { data, isLoading, error } = useGetBasketQuery();
  const [deleteItem] = useDeleteBasketMutation();
  const [updateQuantity] = useUpdateQuantityMutation();

  const { register, handleSubmit, reset } =
    useForm<Omit<IMessage, "products">>();

  const onSubmit: SubmitHandler<Omit<IMessage, "products">> = async (
    formData
  ) => {
    if (!data) return;

    const products = data.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));

    const payload: IMessage = {
      ...formData,
      products,
    };

    try {
      await axios.post("http://16.170.143.10/store/cart-callback/", payload);
      reset();
      alert("Форма успешно отправлена!");
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Произошла ошибка при отправке формы.");
    }
  };

  if (isLoading) return <TextSkeleton />;

  if (error || !data?.length)
    return (
      <div className="w-full h-[100vh] justify-center items-center py-10">
        <div className="container flex flex-col justify-center items-center">
          <Image className="w-[400px] h-full" src={img} alt="img" />
          <h1 className="text-[40px] text-gray-500">Корзина пуста</h1>
        </div>
      </div>
    );

  const total =
    data?.reduce(
      (sum, item) => sum + (item.product?.price ?? 0) * item.quantity,
      0
    ) ?? 0;

  const handleIncrement = (
    id: number,
    currentQuantity: number,
    productId: number
  ) => {
    updateQuantity({
      id,
      quantity: currentQuantity + 1,
      product_id: productId,
    });
  };

  const handleDecrement = (
    id: number,
    currentQuantity: number,
    productId: number
  ) => {
    if (currentQuantity > 1) {
      updateQuantity({
        id,
        quantity: currentQuantity - 1,
        product_id: productId,
      });
    }
  };

  const sortedData = [...data].sort((a, b) => a.id - b.id);

  return (
    <div className="container">
      <div className="w-full py-2 md:px-5 px-0">
        <div className="p-3 mt-[14px]">
          <Title>Корзина</Title>
        </div>
      </div>

      <div className="w-full py-5 md:px-5 px-0">
        <div className="flex flex-col gap-[10px] w-full">
          {sortedData.map((el) => (
            <div
              className="bg-white flex flex-col gap-3 justify-between rounded-[10px] border border-gray-200 p-3 shadow-md"
              key={el.id}
            >
              <div className="flex md:gap-10 gap-3">
                <div className="w-[180px] h-[80px] rounded-[10px] overflow-hidden">
                  <Image
                    className="object-cover w-full h-full"
                    src={
                      el.product?.laptop_image?.[0]?.image || "/fallback.jpg"
                    }
                    alt="img"
                    width={180}
                    height={80}
                  />
                </div>

                <div className="w-full flex md:flex-row flex-col md:gap-2 gap-0">
                  <div className="w-full justify-center flex items-center">
                    <h1 className="w-full text-[20px] font-[400]">
                      {el.product?.name || "Название недоступно"}
                    </h1>
                  </div>

                  <div className="mt-2 md:mt-0 w-full flex items-center">
                    <div className="flex items-center w-full justify-between gap-1">
                      <h2 className="flex w-full max-w-[200px] text-[18px] font-[500] text-black">
                        {(el.product?.price ?? 0) * el.quantity} сом
                      </h2>

                      <div className="md:flex gap-[50px] hidden">
                        <div className="flex items-center justify-center gap-2 px-2">
                          <button
                            onClick={() =>
                              handleDecrement(el.id, el.quantity, el.product.id)
                            }
                            className="w-6 h-6 flex justify-center items-center text-lg border bg-gray-200 border-gray-400 rounded"
                          >
                            –
                          </button>

                          <span className="min-w-[20px] text-center">
                            {el.quantity}
                          </span>

                          <button
                            onClick={() =>
                              handleIncrement(el.id, el.quantity, el.product.id)
                            }
                            className="w-6 h-6 flex justify-center items-center text-lg border bg-gray-200 border-gray-400 rounded"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="px-2 py-1 rounded-[5px] text-white bg-red-500 font-normal"
                          onClick={() => deleteItem(el.id)}
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex md:hidden gap-[10px] w-full justify-between">
                <div className="flex w-[180px] items-center justify-start gap-2">
                  <button
                    onClick={() =>
                      handleDecrement(el.id, el.quantity, el.product.id)
                    }
                    className="w-8 h-6 flex justify-center items-center text-lg border bg-gray-200 border-gray-400 rounded"
                  >
                    –
                  </button>

                  <span className="min-w-[20px] text-center">
                    {el.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleIncrement(el.id, el.quantity, el.product.id)
                    }
                    className="w-8 h-6 flex justify-center items-center text-lg border bg-gray-200 border-gray-400 rounded"
                  >
                    +
                  </button>
                </div>

                <button
                  className="px-2 py-1 rounded-[5px] w-full text-white bg-red-500 font-normal"
                  onClick={() => deleteItem(el.id)}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full md:px-5 px-0">
        <div className="p-3 mt-[14px]">
          <h1 className="flex items-center gap-1 text-[23px] font-semibold">
            <span className="text-[16px]">Итого:</span> {total} сом
          </h1>
        </div>
      </div>

      {/* Форма заказа */}
      <div className="w-full flex justify-center pb-10">
        <div className="w-full md:w-[60%] h-fit flex flex-col gap-1 bg-white rounded-[10px]">
          <div className="w-full h-full bg-white rounded-[10px] flex flex-col items-center gap-4 justify-between border border-gray-300 p-3">
            <div className="w-full flex text-center flex-col items-center">
              <TitleComponent>Оставьте заявку!</TitleComponent>
              <p className="text-gray-500">
                Наши менеджеры свяжутся с вами в ближайшее время
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col items-center gap-2"
            >
              <input
                className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                type="text"
                placeholder="Имя"
                {...register("full_name", { required: true })}
              />
              <input
                className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                type="tel"
                placeholder="Телефон"
                {...register("phone_number", {
                  required: true,
                  pattern: /^\+996\d{9}$/, // проверка на формат
                })}
                defaultValue="+996"
              />
              <textarea
                className="bg-white rounded-[10px] w-full py-2 px-3 outline-none border border-gray-400"
                placeholder="Сообщение"
                {...register("description", { required: true })}
              ></textarea>
              <button
                type="submit"
                className="w-full py-2 flex justify-center items-center bg-black text-white rounded-[10px]"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basket;
