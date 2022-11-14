import React, { Component } from 'react';
import * as firebase from 'firebase';
import HeaderBlock from './components/HeaderBlock';
import ContentBlock from './components/ContentBlock';
import FooterBlock from './components/FooterBlock';
import BannerBlock from './components/BannerBlock';
import Paragraph from './components/Paragraph';
import Header from './components/Header';
import CardList from './components/CardList';
import ReviewsList from './components/ReviewsList';

const reviews = [
  {
    name: 'Alex',
    paragraph: 'Отличное начало курса! Пока не всё понятно, но я справлюсь!'
  },
  {
    name: 'Michael',
    paragraph: 'Спасибо за введение в React. Буду продолжать! К сожалению, на сегодня это всё, что я успеваю сделать, есть важные дела на выходные)'
  },
]

const FIREBASE_API_KEY             = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_AUTH_DOMAIN         = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const FIREBASE_DATABASE_URL        = process.env.REACT_APP_FIREBASE_DATABASE_URL;
const FIREBASE_PROJECT_ID          = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const FIREBASE_STORAGE_BUCKET      = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
const FIREBASE_MESSAGING_SENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID;
const FIREBASE_APP_ID              = process.env.REACT_APP_FIREBASE_APP_ID;

const firebaseConfig = {
  apiKey:            FIREBASE_API_KEY,
  authDomain:        FIREBASE_AUTH_DOMAIN,
  databaseURL:       "https://learning-english-is-fun.firebaseio.com",
  projectId:         FIREBASE_PROJECT_ID,
  storageBucket:     FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId:             FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

class App extends Component {
    state = {
        wordArr: [],
    }

    componentDidMount() {
      database.ref('/cards').once('value').then(res => {
        this.setState({
          wordArr: res.val(),
        });
      })
    }

    // Обработчик удаления карточки
    handleDeletedItem = (id) => {
        this.setState(({ wordArr }) => {
            const idx = wordArr.findIndex(item => item.id === id); // индекс удаляемого элемента
            const newWordsArr = [
                ...wordArr.slice(0, idx),
                ...wordArr.slice(idx+1)
            ]
            return {
              wordArr: newWordsArr,
            }
        });
    }

    // Обработчик создания новой карточки
    handleCreatedItem = ( newEngWord, newRusWord ) => {
        const { wordArr } = this.state;
        // добавление в базу данных
        database.ref('/cards').set([...wordArr, {
          id: +new Date(),
          eng: newEngWord,
          rus: newRusWord
        }]);

        this.setState(({ wordArr }) => {
            let lastIndex = 0;
            if (wordArr.length === 0) {
                lastIndex = 0;
            } else {
                lastIndex = wordArr[wordArr.length-1].id;
            }
            const newWordsArr = [
                ...wordArr,
                {eng: newEngWord, rus: newRusWord, id: lastIndex+1}
            ]
            return {
                wordArr: newWordsArr,
            }
        });
    }

    render() {
        const { wordArr } = this.state;
        return (
            <>
                <HeaderBlock>
                    <Header>Время учить слова онлайн</Header>
                    <Paragraph>Воспользуйтесь карточками для запоминания и пополнения активных словарных запасов</Paragraph>
                </HeaderBlock>
                <CardList
                    onCreated={this.handleCreatedItem}
                    onDeletedItem={this.handleDeletedItem}
                    item={wordArr}
                />
                <HeaderBlock hideBackground>
                    <Header>Еще один заголовок</Header>
                    <Paragraph>Incredible!</Paragraph>
                </HeaderBlock>
                <ContentBlock
                title="Разивайтесь!"
                paragraph="Не стоять на месте!"
                contentImg="/components/ContentBlock/img/words.jpeg"
                />
                <BannerBlock
                bannerText="Здесь когда-нибудь будет реклама."
                />
                <ContentBlock
                contentImgRevert
                styleRevert
                title="Учиться, учиться и еще раз учиться!"
                paragraph="Без труда не вытащишь и рыбку из пруда"
                />
                <BannerBlock
                bannerText="Возможно, здесь так же будет реклама."
                />
                <ReviewsList review={reviews}>
                    <Header>Отзывы</Header>
                </ReviewsList>
                <FooterBlock
                linkTo="https://bitbucket.org/andrey_trushnikov/react_marathon/src/master/"
                linkToName="Ссылка на репозиторий."
                />
            </>
        );
    }
}

export default App;
