# User API Spec

## Register User API

Endpoint :  POST /api/users 

Request Body :

```json
{
  "name" : "Isna Prastya",
  "username" : "akaishawl",
  "email": "isnaprastya@gmail.com",
  "password" : "secretnumber"
  
}
```

Response Body Success :

```json
{
  "data" : {
    "name" : "Isna Prastya",
    "username" : "akaishawl",
    "email": "isnaprastya@gmail.com"
  }

}
```

Response Body Error : 

```json
{
  "errors" : "Username or email already exists"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
 "email" : "isnaprastya@gmail.com",
 "password" : "secretnumber"
}
```

Response Body Success : 

```json
{
  "data" : {
    "token" : "unique-token"
  }
}
```

Response Body Error :

```json
{
  "errors" : "Incrorrect email or password"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers :
- Authorization : token 

Request Body :

```json
{
  "name" : "Isna",
  "password" : "newjeans"
}
```

Response Body Success : 

```json
{
  "data" : {
    "name" : "Isna",
    "username" : "akaishawl"
  }

}
```

Response Body Error : 

```json
{
  "errors" : "Name length max 20"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers :
- Authorization : token

Response Body Success:

```json
{
  "data" : {
       "name" : "Isna Prastya",
   "username" : "akaishawl"
  }
}
```

Response Body Error : 

```json
{
  "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :
- Authorization : token

Response Body Success : 

```json
{
  "data" : "OK"
}
```

Response Body Error : 

```json
{
  "errors" : "Unauthorized"
}
```