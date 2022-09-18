import Commerce from "@chec/commerce.js";

const public_key=process.env.REACT_APP_CHEC_PUBLIC_KEY;
// other product key : "pk_test_19661763baf3194382812193e2e539617b1870f41d8b9"
// public key commerce js
//imported in enveronement

export const commerce = new Commerce("pk_test_19661763baf3194382812193e2e539617b1870f41d8b9",true);

// console.log(commerce);