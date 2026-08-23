module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'FE',       // Frontend
        'BE',       // Backend
        'deps',     // Dependencies
      ],
    ],
    // FIX 1: Izinkan huruf besar (upper-case) dan huruf kecil (lower-case) untuk scope
    'scope-case': [2, 'always', ['upper-case', 'lower-case']],

    // Type yang diperbolehkan
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    // Subject/deskripsi tidak boleh diawali huruf kapital
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    // Subject tidak boleh diakhiri titik
    'subject-full-stop': [2, 'never', '.'],
    // Subject tidak boleh kosong
    'subject-empty': [2, 'never'],
    // Type tidak boleh kosong
    'type-empty': [2, 'never'],
  },
};