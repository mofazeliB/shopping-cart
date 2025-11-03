import React, { useState, useEffect } from "react";
import Counter from "@/components/Counter/Counter";
import { ProductLocal, QuickPreview } from "@/context/ShoppingCart";
import styles from "./ProductItem.module.scss";

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable  jsx-a11y/no-static-element-interactions */
/* eslint-disable  jsx-a11y/interactive-supports-focus */

type Props = {
  addToCart: (prodect: ProductLocal) => void;
  openModal: (prodect: QuickPreview) => void;
  id: number;
  price: number;
  image: string;
  name: string;
  unit: string;
};

const ProductItem = ({
  addToCart,
  openModal,
  id,
  price,
  image,
  name,
  unit,
}: Props) => {
  const [quantity, updateQuantity] = useState<number>(1);
  const [isAdded, setAddState] = useState<boolean>(false);

  useEffect(() => {
    if (!isAdded) {
      return;
    }
    const timer1 = setTimeout(() => setAddState(false), 3500);
    // this will clear Timeout when component unmount like in willComponentUnmount
    return () => {
      clearTimeout(timer1);
    };
  }, [isAdded]);

  const addButtonClicked = (
    imageLocal: string,
    nameLocal: string,
    priceLocal: number,
    idLocal: number,
    unitLocal: string,
    quantityLocal: number
  ) => {
    const selectedProduct = {
      image: imageLocal,
      name: nameLocal,
      price: priceLocal,
      id: idLocal,
      quantity: quantityLocal,
      unit: unitLocal,
    };
    addToCart(selectedProduct);
    setAddState(true);
  };

  const quickView = (
    quickImage: string,
    quickName: string,
    quickPrice: number,
    quickId: number
  ) => {
    const quickViewProduct = {
      image: quickImage,
      name: quickName,
      price: quickPrice,
      id: quickId,
    };
    openModal(quickViewProduct);
  };

  // let quantity = props.productQuantity;
  return (
    <div className={styles.productWrapper}>
      <div className={styles.product}>
        <div className={styles.outline}>
          <div
            className={styles.productImage}
            onClick={() => quickView(image, name, price, id)}
            role="button"
          >
            <img src={image} alt={name} />
          </div>
          <h4 className={styles.productName}>{`${name} - ${unit}`}</h4>
          <p className={styles.productPrice}>{price}</p>
          <Counter productQuantity={quantity} updateQuantity={updateQuantity} />
          <div className={styles.productAction}>
            <button
              className={!isAdded ? "" : styles.added}
              type="button"
              onClick={() =>
                addButtonClicked(image, name, price, id, unit, quantity)
              }
            >
              {!isAdded ? "افزودن به سبد" : "✔ افزوده شد"}
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {products.map((product) => (
    <div className="product-card p-4">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-lg"/>
      <div className="mt-4">
        <h3 className="text-xl font-bold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-semibold">{product.price} تومان</span>
          <button className="btn">افزودن به سبد خرید</button>
        </div>
      </div>
    </div>
  ))}
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
