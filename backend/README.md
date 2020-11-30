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



### /login  (Post)

##### Request
```
{
    "email": <string>,
    "password": <string>
}
```

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



### /list() (Post)

##### Request
```
{
    "name": <string>,
    "boardId": <int>
}
```


creates a new, empty list


### /card() (Post)

##### Request
```
{
    "name": <string>,
    "listId": <int>
}
```


creates a new, empty card



### /boardPrivacy(int id, boolean makePrivate) (Put)

sets board isPrivate field to requested status. Current user has to be admin of the board.



### /boardArchive(int id, boolean makeArchived) (Put)

sets board isArchived field to requested status. Current user has to be admin of the board.






### /boardName(int id, string name) (Put)

sets the board name to the name parameter. Current user has to be admin of the board.




### /listName(int id, string name) (Put)

sets the list name to the name parameter. Current user has to be admin of the board the list is placed in.

