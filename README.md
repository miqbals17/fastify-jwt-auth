# CRUD dengan JWT Authentication
![JWT](https://jwt.io/img/badge-compatible.svg)

Proyek CRUD dengan Fastify dan JWT yang disimpan pada Cookies

Dalam proyek ini, terdapat beberapa path yang dapat digunakan yaitu:
1. `GET     /posts`: Untuk melihat seluruh data post
2. `GET     /posts/:id`: **Private Route** Untuk melihat detail post dengan parameter `id`
3. `POST    /posts/new`: **Private Route** Untuk menambahkan post baru
4. `PUT     /posts/:id`: **Private Route** Untuk mengedit post dengan parameter `id`
5. `DELETE  /posts/:id`: **Private Route** Untuk menghapus post dengan parameter `id`

## Alur Program
1. Pengguna dapat mengakses route `/posts` tanpa memerlukan token,
2. Jika pengguna ingin mengakses privateRoute, diperlukan bearer token,
3. Program mengecek apakah terdapat token yang tersimpan dalam cookies,
4. Jika ada maka privateRoute dapat diakses,
5. Jika tidak ada maka privateRoute tidak dapat diakses dan memberikan `error: Unauthorized`

## Alur Generate JWT Token
