Области хранения данных:
- база данных на json-server
- BFF
- redux store

Сущности приложения:

- пользователь: БД(список пользователей)BFF(сесия текущего) , стор(отображения в браузере)
-роль пользователя: БД(список ролей), BFF(сесия пользователя с ролью), стор(использовние на клиенте)
- статья: БД(список статей), стор(отображение в браузере)
- комментарий: БД(список коментариев) стор(отображение в браузере)

Таблицы БД:
- пользователи - users: id/login / password/ registed_at/ role_id
-роли -roles: id/namurl /
-статьи -posts: id/title/image_url/ content/published_at
- комментарии -comments/ id / autor_id / post_id/ content

Схема состояния на BFF:
-сессия текущего пользователя: login/ password/ role
 
 Схема для редакс стора (на клиенте):
 -user: id/login/roleid
 -posts: массив post: id / title/imageUrl/ publichedAt / commentsCount
-post:  id / title/imageUrl//content/ publichedAt / comments: массив coment: id/author/content/publishedAt
-users: массив user: id/login/ refisteredAt/role


   
      
      
   

      https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png