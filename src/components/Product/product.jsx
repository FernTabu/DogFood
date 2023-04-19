import s from "./index.module.scss";
import truck from "./img/truck.svg";
import quality from "./img/quality.svg";
import cn from "classnames";
import { ReactComponent as Save } from "./img/save.svg";
import { ReactComponent as Basket } from './img/basket.svg'
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import {
  useNavigate,
} from "react-router-dom";
import { Rating } from "../Rating/Rating";
import { Form } from "../Form/Form";
import { useForm } from "react-hook-form";
import { BaseButton } from "../BaseButton/BaseButton";
import { openNotification } from "../Notifiaction/Notification";
import { ContentHeader } from "../../components/ContentHeader/content-header";



export const Product = ({ id, product, reviews, onProductLike, currentUser, onSendReview, onDeleteReview }) => {
  const [rate, setRate] = useState(3);
  const [users, setUsers] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [reviewsProduct, setReviewsProduct] = useState(reviews);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset
  } = useForm({ mode: "onSubmit" });

  const sendReview = async (data) => {
    try {
      const newProduct = await api.addReview(product._id, { text: data.review, rating: rate })
      onSendReview(newProduct);
      // setReviewsProduct(state => [...newProduct.reviews])
      setShowForm(false);
      reset();
      openNotification('success', 'Успешно', 'Ваш отзыв успешно отправлен')
    } catch (error) {
      openNotification('error', 'error', 'Ваш отзыв отправить не удалось')
    }
  }


  const navigate = useNavigate();

  const [isLikedProduct, setIsLikedProduct] = useState(false);



  const getUser = (id) => {
    if (!users.length) return 'User';

    const user = users.find(e => e._id === id);
    if (user?.avatar.includes('default-image')) {
      return { ...user, avatar: 'https://thumbs.dreamstime.com/b/road-to-love-trees-shape-heart-58864200.jpg' }
    }
    return user
  }

  const deleteReview = async (id) => {
    // setReviewsProduct(() => [...res.reviews])
    try {
      const res = await onDeleteReview(id);
      openNotification('success', 'Успешно', 'Ваш отзыв удален')
      
    } catch (error) {
      openNotification('error', 'Ошибка', 'Ваш отзыв удалить не получилось')
      
    }
  }

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }

  const onLike = (e) => {
    onProductLike(product);
    // setIsLikedProduct(state => !state)
  };

  const textRegister = register("review", {
    required: "review обязателен",
  });

  const hideReviews = () => {
    setReviewsProduct(() => [...reviews.slice(0, 2)])
  }

  const showMore = () => {
    setReviewsProduct((state) => [...reviews.slice(0, state.length + 2)])
  }

  useEffect(() => {
    setReviewsProduct(() => reviews)
  }, [reviews])



  useEffect(() => {
    const isLiked = product?.likes?.some((el) => el === currentUser._id)
    setIsLikedProduct(isLiked)
  }, [product.likes]);



  useEffect(() => {
    if (!product?.reviews) return;
    const rateAcc = (product.reviews.reduce((acc, el) => acc = acc + el.rating, 0));
    const accum = (Math.floor(rateAcc / product.reviews.length));
    setRate(accum);
    setCurrentRating(accum);
  }, [product?.reviews]);

  useEffect(() => {
    api.getUsers().then((data) => setUsers(data))
  }, []);

  

  return (
    <>
      <ContentHeader >
      <div>
        <h1>{product.name}</h1>
        <div className={s.rateInfo}>
          <span>Art <b>2388907</b></span>
          <Rating rate={currentRating} setRate={() => { }} />
          <span>{product?.reviews?.length} отзывов</span>
        </div>
      </div>
      <div className={s.product}>
        <div className={s.imgWrapper}>
          <img className={s.img} src={product.pictures} alt={`Изображение`} />
          {product.tags?.map((e) => (
            <span key={e} className={`tag tag_type_${e}`}>{e}</span>
          ))}
        </div>
        <div className={s.desc}>
          <span className={s.price}>{product.price}&nbsp;₽</span>
          {!!product.discount && (
            <span className={`${s.price} card__price_type_discount`}>
              {product.discount}&nbsp;%
            </span>
          )}
          <div className={s.controls}>
            <div className={s.controls__left}>
              <button className={s.controls__minus}>-</button>
              <span className={s.controls__num}>0</span>
              <button className={s.controls__plus}>+</button>
              </div>
              <button
                className={`btn btn_type_primary ${s.controls__cart} ${s.controls__cart__red}`}
                onClick={() => navigate("/product/63ecf77059b98b038f77b65f")}
              >
                В корзину
              </button>
          </div>
          <button className={cn(s.favorite, { [s.favoriteActive]: isLikedProduct })} onClick={(e) => onLike(e)}>
            <Save />
            <span>{isLikedProduct ? "В избранном" : "В избранное"}</span>
          </button>
          <div className={s.delivery}>
            <img src={truck} alt="truck" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
          <div className={s.delivery}>
            <img src={quality} alt="quality" />
            <div className={s.right}>
              <h3 className={s.name}>Доставка по всему Миру!</h3>
              <p className={s.text}>
                Доставка курьером — <span className={s.bold}>от 399 ₽</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={s.box}>
        <h2 className={s.title}>Описание</h2>
        <div>{product.description}</div>
        <h2 className={s.title}>Характеристики</h2>
        <div className={s.grid}>
          <div className={s.naming}>Вес</div>
          <div className={s.description}>1 шт 120-200 грамм</div>
          <div className={s.naming}>Цена</div>
          <div className={s.description}>490 ₽ за 100 грамм</div>
          <div className={s.naming}>Польза</div>
          <div className={s.description}>
            <p>
              Большое содержание аминокислот и микроэлементов оказывает
              положительное воздействие на общий обмен веществ собаки.
            </p>
            <p>Способствуют укреплению десен и жевательных мышц.</p>
            <p>
              Развивают зубочелюстной аппарат, отвлекают собаку во время смены
              зубов.
            </p>
            <p>
              Имеет цельную волокнистую структуру, при разжевывание получается
              эффект зубной щетки, лучше всего очищает клыки собак.
            </p>
            <p>Следует учесть высокую калорийность продукта.</p>
          </div>
        </div>
      </div>
      <div>
        <div className={s.review__wrapper}>
          <BaseButton onClick={() => setShowForm(true)} color={'white1'}>
            <span>Добавить отзыв</span>
          </BaseButton>
          {showForm &&
            <Form className={s.review__form} submitForm={handleSubmit(sendReview)}>
              <Rating rate={rate} isEditable={true} setRate={setRate} />
              <span>Оставьте ваш отзыв</span>
              <textarea
                placeholder="Ваш отзыв"
                className={s.review__form__text}
                {...textRegister}
              />
              <BaseButton style={{ width: '256px' }} color={'yellow'} type="submit">Отправить отзыв</BaseButton>
            </Form>
          }
          <div className={s.review__show_more}>
            <span onClick={showMore}>Еще отзывы</span>
            <span onClick={hideReviews}>Скрыть отзывы</span>
          </div>

        </div>
        {users && reviewsProduct
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((r) => <div key={r._id} className={s.review}>
            <div className={s.review__author}>
              <div className={s.review__info}>
                <img className={s.review__avatar} src={getUser(r.author._id)?.avatar} alt='avatar' />
                <span>{getUser(r.author._id)?.name ?? 'User'}</span>
                <span className={s.review__date}>{new Date(r.created_at).toLocaleString('ru', options)}</span>
              </div>
              <Rating rate={r.rating} isEditable={false} />
            </div>
            <div className={s.text}>
              <span>
                {r.text}
              </span>
              {currentUser._id === r.author._id  &&
                <Basket onClick={() => deleteReview(r._id)} className={s.text__img} />
                
              }
            </div>
          </div>)}
        </div>
      </ContentHeader>
    </>
  );
};
