export const download = (
  name: string,
  looks: string,
  tech: string,
  mental: string,
  attrs: string[],
  unicorn: string,
  voice: string,
  profile1: string,
  profile2: string,
  profile3: string,
  imgUrl: string,
) => {
  // 画像のダウンロード
  const anchor = document.createElement('a')
  anchor.download = `${name}.png`
  anchor.href = imgUrl
  anchor.click()

  //
  let str = ''
  if (name !== '') {
    str += `名前=${name}\r\n`
  }
  if (looks !== 'random') {
    str += `ルックス=${looks}\r\n`
  }
  if (tech !== 'random') {
    str += `テクニック=${tech}\r\n`
  }
  if (mental !== 'random') {
    str += `メンタル=${mental}\r\n`
  }
  for (const attr of attrs) {
    str += `属性=${attr}\r\n`
  }
  if (unicorn !== '-1') {
    str += `処女=${unicorn}\r\n`
  }
  if (voice !== '') {
    str += `音声=${voice}\r\n`
  }
  const profile = [profile1, profile2, profile3]
  for (const p of profile) {
    if (p !== '') {
      str += `プロフィール=${p}\r\n`
    }
  }
  anchor.href = URL.createObjectURL(new Blob([str], { type: "application/octet-stream" }))
  anchor.download = `${name}.txt`
  anchor.click()
}
