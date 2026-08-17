### Running
```bash
yarn install
```

Jika belum install yarn
```bash
npm install -g yarn
```

Running Back End
```bash
yarn dev
```

Running Mobile
```bash
cd apps/mobile
yarn mobile:dev
```

### Penggunaan yarn

#### Menambah package ke Mobile (misal: Axios):
```bash
yarn workspace @kuvera/mobile add axios
```

#### Menambah package ke Backend (misal: Express):
```bash
yarn workspace @kuvera/back-end add express
```

#### Menambah dev-dependency ke seluruh repo / root (misal: Prettier):
```bash
yarn add -W -D prettier
```

### Git Workflow Sehari-hari
Cara kerja Git tetap sama seperti repo biasa. Perbedaannya hanya pada pesan commit agar rapi (sangat disarankan menggunakan awalan/scope):
```bash
git add .
git commit -m "feat(api): add auth login endpoint"
git commit -m "feat(mobile): integrate login screen with API"
git push origin master
```

### Rules commit
- feat | fitur baru | feat(api): add auth login endpoint
- fix | Perbaikan bug/error | fix(mobile): fix layout overflow on iOS
- refactor | Perubahan kode tanpa mengubah fungsionalitas (tidak nambah fitur/fix bug) | refactor(shared): clean up user validation DTO
- chore | Pemeliharaan build, konfigurasi monorepo, atau dependency | chore: update yarn workspace config
- docs | Perubahan dokumentasi saja | docs: add setup guide in README
- style | Format kode (spasi, titik koma, linter—tanpa ubah logika)| style(api): run prettier on auth controller
- test | Menambah atau memperbaiki unit/integration test | test(api): add unit test for payment gateway
- perf | Perubahan kode untuk meningkatkan performa| perf(mobile): optimize image loading in list
- ci | Perubahan konfigurasi CI/CD | ci: add github action workflow for deployment