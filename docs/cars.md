
### Cars

**Create**

```
path: "/cars"
type: "POST"
Auth: Bearer Token
```

```json
Request:
BODY: {
  plate: string;
  chassis: string;
  reindeer: string;
  model: string;
  brand: string;
  year: number;
}
```

```json
Response:
{
  "car": {
    "plate": "MVC1516",
    "chassis": "612YYACFFzFB89088",
    "reindeer": "98926556089",
    "model": "Buggy  Walk Sport 1.6 8V 58cv",
    "brand": "Walk",
    "year": 2005,
    "id": "3a4957d9-1041-4c7e-89ef-a5f83dddc48e",
    "created_at": "2021-07-20T04:23:03.849Z",
    "updated_at": "2021-07-20T04:23:03.849Z"
  }
}
```


**Update**

```
path: "/cars/:id"
type: "PUT"
Auth: Bearer Token
```

```json
Request:
BODY: {
  plate?: string;
  chassis?: string;
  reindeer?: string;
  model?: string;
  brand?: string;
  year?: number;
}
```

```json
Response:
{
  "car": {
    "id": "3a4957d9-1041-4c7e-89ef-a5f83dddc48e",
    "plate": "MVC1516",
    "chassis": "612YYACFFzFB89088",
    "reindeer": "98926556089",
    "model": "Buggy  Walk Sport 1.6 8V 58cv",
    "brand": "Walk",
    "year": 2006,
    "created_at": "2021-07-20T04:23:03.849Z",
    "updated_at": "2021-07-20T04:37:02.802Z"
  }
}
```

**Delete**

```
path: "/cars/:id"
type: "DELETE"
Auth: Bearer Token
```

```json
Response:
{
  "removed": true
}
```

**List**

```
path: "/cars"
type: "GET"
Auth: Bearer Token
```

```json
Request:
Query Params: {
  plate?: string;
  chassis?: string;
  reindeer?: string;
  model?: string;
  brand?: string;
  year?: number;
}
```

```json
Response:
{
  "car": [
    {
      "id": "200c94ef-dc23-45cf-ab30-19456a1c3754",
      "plate": "MZN0908",
      "chassis": "791AWJub10Xb49968",
      "reindeer": "38582127391",
      "model": "Legend 3.2/3.5",
      "brand": "Acura",
      "year": 1991,
      "created_at": "2021-07-20T01:41:44.377Z",
      "updated_at": "2021-07-20T01:41:44.377Z"
    },
    {
      "id": "29f94807-5212-4bfe-a08f-7769c71b4f3e",
      "plate": "MUR8598",
      "chassis": "2A3Wl5BtyyaPm9706",
      "reindeer": "75432218981",
      "model": "Picape BG-Truck CD Turbo Diesel",
      "brand": "Miura",
      "year": 1993,
      "created_at": "2021-07-20T01:44:43.396Z",
      "updated_at": "2021-07-20T01:44:43.396Z"
    },
  ]
}
```

**List by Id**

```
path: "/cars/:id"
type: "GET"
Auth: Bearer Token
```

```json
Response:
{
  "car": {
    "id": "a71c8aa1-f584-4ee0-8092-7d1f9a974786",
    "plate": "MNY5087",
    "chassis": "7a6JTFMyB5dSd3813",
    "reindeer": "70742604625",
    "model": "Buggy  Walk Sport 1.6 8V 58cv",
    "brand": "Walk",
    "year": 2005,
    "created_at": "2021-07-20T01:45:53.152Z",
    "updated_at": "2021-07-20T01:45:53.152Z"
  }
}
```
