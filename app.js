const path = require('path'); // node_modules에 있는 path를 가져옴
const express = require('express'); // node_modules에 있는 express를 가져옴

// 구조분해할당
const dt = require('./modules/sample');
// console.log(dt.nowDateIso());
// console.log(dt.nowDateKorean());

// 비구조분해할당
const {nowDateIso, nowDateKorean} = require('./modules/sample');
// console.log(dt.nowDateIso());
// console.log(dt.nowDateKorean());

const memberRouter = require('./routes/member');

const notFound = path.join(__dirname, './public/404.html');

const app = express();
app.listen(3000, () => {console.log('http://127.0.0.1:3000');});

// set : 변수등록
// app.set('view engine', 'ejs');
app.set('view engine', 'pug'); // view를 해석하는 엔진은 pug를 쓸 것임
app.set('views', './views') // pug 파일의 저장 경로는 ./views 임
app.locals.pretty = true;

/* 
	use : get 혹은 post 방식 모두 받음
	get : get 방식으로만 받음
	post : post 방식으로만 받음
*/

/* 
	- public 폴더에 index.html 문서가 없을 때, /로 요청이 들어올 경우
	app.use 명령을 지나 app.get 명령을 수행

	- public 폴더에 index.html 문서가 있을 때, /로 요청이 들어올 경우
	app.use 명령을 수행
*/

// /로 요청이 들어오면 다음의 경로에서 index 문서를 찾는다
app.use('/', express.static(path.join(__dirname, './public'))); // 절대 경로 생성

app.get('/sample', (req, res, next) => {
	// res.send('');
	// res.sendFile('절대경로');
	// res.redirect('/member');
	res.render('./sample.pug', {title : 'PUG 연습'}); // vies 엔진을 사용하여 보여줄 것
});

app.get('/book', (req, res, next) => {
	const pug = {books : [
		{id : 1, title : '별주부전', content : '거북이가 간을...'},
		{id : 2, title : '홍길동전', content : '아버지를 아버지라...'},
		{id : 3, title : '심청전', content : '아버지 심청이가...'},
	]};
	res.render('./book.pug', pug);
});

app.use('/member', memberRouter);

app.get('/', (req, res) => {
	res.send('<h1>hi~ hyewon</h1>');
});

/* 
	로직 01.
	request - response(/404.html) - redirect - response(path.join(__dirname, './public')의 절대경로에서 404.html 문서 찾아 reponse)

	로직 02.
	request - sendFile(path.join(__dirname, './public/404.html'))
*/
app.use((req, res) => {
	res.sendFile(notFound); // 02. 절대경로로 보내주기
	// res.redirect('/404.html'); // 01. redirect로 보내주기(실무에서 선호)
});