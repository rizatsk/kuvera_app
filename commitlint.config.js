module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
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
    // Scope wajib huruf kecil (lowercase)
    'scope-case': [2, 'always', 'lower-case'],
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