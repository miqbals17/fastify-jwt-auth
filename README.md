# CRUD dengan JWT Authentication
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

Proyek CRUD dengan Fastify dan JWT yang disimpan pada Cookies
- [Alur Program](#alur-program)
- [Alur Generate JWT Token](#alur-generate-jwt-token)

Route Path:
1. `GET     /posts`: Untuk melihat seluruh data post
2. `GET     /posts/:id`: **Private Route** Untuk melihat detail post dengan parameter `id`
3. `POST    /posts/new`: **Private Route** Untuk menambahkan post baru
4. `PUT     /posts/:id`: **Private Route** Untuk mengedit post dengan parameter `id`
5. `DELETE  /posts/:id`: **Private Route** Untuk menghapus post dengan parameter `id`
6. `POST    /register`: Untuk mendaftarkan akun dengan parameter email dan password
7. `POST    /login`: Untuk login akun dan mendapatkan JWT Token dengan parameter email dan password

## Alur Program
1. Pengguna dapat mengakses route `/posts` tanpa memerlukan token,
2. Jika pengguna ingin mengakses privateRoute, diperlukan bearer token,
3. Program mengecek apakah terdapat token yang tersimpan dalam cookies,
4. Jika ada maka privateRoute dapat diakses,
5. Jika tidak ada maka privateRoute tidak dapat diakses dan memberikan `error: Unauthorized`

## Alur Generate JWT Token
1. Pengguna melakukan register akun dengan memasukkan username dan password sebagai body pada path `/register`
2. Jika sudah terdaftar, pengguna melakukan login pada path `/login`
3. Jika email terdaftar dan email benar, maka JWT akan *generate* Token yang disimpan dalam *cookies* yang berlaku selama 120 detik
4. Ketika pengguna mengakses **Private Route**, server akan mengambil data token yang telah tersimpan dalam cookies