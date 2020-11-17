# PAWProjekt-backend

## Building project

### WAR
`mvn clean package`

### Manual deployment to heroku
`mvn clean heroku:deploy-war`

## Running
Use `runRestServices.bat` (**requires** war file to be built)


## Endpoints

### /register  (Post)


##### Request
```
{
    "email": <string>,
    "password": <string>,
    "name": <string>
}
```



<<<<<<< HEAD
### /login  (Post)

##### Request
```
{
    "email": <string>,
    "password": <string>
}
```
=======
### /login(String email, String password)  (Post)

>>>>>>> 39be406e909151da15ce10a33c36e172124643c6

##### returns
```
{
    "userType": <string>
}
```



### /boards  (Get)

##### returns
```
List<Board>
```




### /board(int id) (Get)

##### returns
```
Board
```



### /board(String name, boolean isPrivate) (Post)

creates a new, empty board



### /list(String name, int boardId) (Post)

creates a new, empty list
