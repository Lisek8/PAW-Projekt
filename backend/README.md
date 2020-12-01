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



### /cardDescription(int id, string name) (Put)

sets the card description to the description parameter. Current user has to be logged in and have access to the board


### /label (Post)

##### Request
```
{
    "name": <string>,
    "color": <string>
}
```

Creates a new label with chosen name and color



### /label(int id) (Put)

##### Request
```
{
    "id": <int>   //id of the label that you want to edit
    "name": <string>,
    "color": <string>
}
```

Changes the label to given name and color. Status 404 if wrong id is given.




### /cardLabel(int labelId, int cardId) (Post)

##### Request


Adds the selected label to a card





### /label (Post)

##### Request
```
{
    "id": <int>   //id of the board, to which you want to add a label
    "name": <string>,
    "color": <string>
}
```

Creates a new label with chosen name and color and adds it in the selected board



### /label(int id) (Get)

Displays label with selected id. Returns 404 status if label doesn't exist.


### /labels(int boardId) (Get)

Displays all the labels present in the selected board
