import { useContext } from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../components/Product/Product";
import { CardContext } from "../../context/cardContext";
import { UserContext } from "../../context/userContext";
import { api } from "../../utils/api";
import Spinner from "../../components/Spinner/index"

export const ProductPage = () => {
  const id = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { handleProductLike } = useContext(CardContext);

  // Это функция из дочернего компонента Product.jsx которая вызывает функцию handleProductLike в App.jsx и
  // обновляет текущий продукт через удаление или добавление айди текущего юзера (currentUser._id)
  // Если handleProductLike нам возвращает true , это значит, что товар был лайкнут до изменения.
  // Если он был лайкнут до изменения, значит было совершено действие по его удалению, значит нам надо удалить лайк из массива лайков этого продукта
  // Если он не был лайкнут до изменения  , значит было совершено действие по его добавлению. Значит нам надо добавить лайк(добавить айди текущего юзера) в массив лайков
  // этого продукта
  const onProductLike = () => {
    const wasLiked = handleProductLike(product);
    if (wasLiked) {
      const filteredLikes = product.likes.filter((e) => e !== currentUser._id);
      setProduct({ ...product, likes: filteredLikes });
    } else {
      const addedLikes = [...product.likes, currentUser._id];
      setProduct({ ...product, likes: addedLikes });
    }
  };

  const onSendReview = (newProduct) => {
    setProduct(() => ({ ...newProduct }));
  };

  const deleteReview = async (id) => {
    const result = await api.deleteReview(product._id, id);
    setProduct((state) => ({ ...result }));
    return result;
  };

  useEffect(() => {
    if (!id?.productId) {
      return;
    }
    api.getProductById(id?.productId).then((data) => setProduct(data));
  }, [id?.productId]);

  useEffect(() => {
    console.log({ product });
    if (product?.reviews && Array.isArray(product?.reviews)) {
      setReviews(() => [
        ...product.reviews?.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        ),
      ]);
    }
  }, [product]);
  console.log({ reviews });

  return (
    <>
      {product && currentUser ? (
        <Product
          product={product}
          reviews={reviews}
          onDeleteReview={deleteReview}
          onSendReview={onSendReview}
          id={id.productId}
          onProductLike={onProductLike}
          currentUser={currentUser}
        />
      ) : (
          <Spinner />
      )}
    </>
  );
};
