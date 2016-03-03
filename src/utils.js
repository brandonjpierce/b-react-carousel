export function outerWidth(el) {
  const computed = window.getComputedStyle(el);
  const left = +computed.marginLeft.replace('px', '');
  const right = +computed.marginRight.replace('px', '');
  const offsetWidth = el.offsetWidth;

  return offsetWidth + left + right;
}
