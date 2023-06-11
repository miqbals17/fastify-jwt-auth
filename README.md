# CRUD dengan JWT Authentication

Proyek CRUD dengan Fastify dan JWT yang disimpan pada Cookies

Dalam proyek ini, terdapat beberapa path yang dapat digunakan yaitu:
1. `GET     /posts`: Untuk melihat seluruh data post
2. `GET     /posts/:id`: **Private Route** Untuk melihat detail post dengan parameter `id`
3. `POST    /posts/new`: **Private Route** Untuk menambahkan post baru
4. `PUT     /posts/:id`: **Private Route** Untuk mengedit post dengan parameter `id`
5. `DELETE  /posts/:id`: **Private Route** Untuk menghapus post dengan parameter `id`