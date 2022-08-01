const dataInput = document.querySelector("#data");
const mainColorPicker = document.querySelector("#color");
const bgColorPicker = document.querySelector("#bg-color");
const colorValue = document.querySelector("#color-value");
const bgColorValue = document.querySelector("#bg-color-value");
const imageFormat = document.querySelector('input[name="format"]:checked');

const updateColor = (e) => {
  const { value } = e.target;
  colorValue.innerText = value;
};

const updateBgColor = (e) => {
  const { value } = e.target;
  bgColorValue.innerText = value;
};

const addColorPickerEventListeners = () => {
  mainColorPicker.addEventListener("change", updateColor);
  bgColorPicker.addEventListener("change", updateBgColor);
};

addColorPickerEventListeners();

const sizeSlider = document.querySelector("#size");
const marginSlider = document.querySelector("#margin");

const sizeValue = document.querySelector("#size-value");
const marginValue = document.querySelector("#margin-value");

const updateSize = (e) => {
  const { value } = e.target;
  sizeValue.innerText = `${value} x ${value}`;
};

const updateMargin = (e) => {
  const { value } = e.target;
  marginValue.innerText = `${value} px`;
};

const addSliderEventListeners = () => {
  sizeSlider.addEventListener("change", updateSize);
  marginSlider.addEventListener("change", updateMargin);
};

addSliderEventListeners();

const submitButton = document.querySelector("#cta");

const showInputError = () => {
  dataInput.classList.add("error");
};

const dataInputEventListener = () => {
  dataInput.addEventListener("change", (e) => {
    if (e.target.value !== "") {
      dataInput.classList.remove("error");
      submitButton.removeAttribute("disabled");
    } else {
      dataInput.classList.add("error");
      submitButton.setAttribute("disabled", true);
    }
  });
};

dataInputEventListener();

const prepareParameters = (params) => {
  return {
    data: params.data,
    size: `${params.size}x${params.size}`,
    color: params.color.replace("#", ""),
    bgcolor: params.bgcolor.replace("#", ""),
    qzone: params.qZone,
    format: params.format,
  };
};

const settingsContainer = document.querySelector("#qr-code-settings");
const resultContainer = document.querySelector("#qr-code-result");
const qrCodeImage = document.querySelector("#qr-code-image");

const displayQrCode = (imgUrl) => {
  settingsContainer.classList.add("flipped");
  resultContainer.classList.add("flipped");

  qrCodeImage.setAttribute("src", imgUrl);
};

const getQrCode = (parameters) => {
  const urlParams = new URLSearchParams(parameters).toString();
  const baseURL = "http://api.qrserver.com/v1/create-qr-code/";

  const fullUrl = `${baseURL}?${urlParams}`;

  fetch(fullUrl).then((response) => {
    if (response.status === 200) {
      displayQrCode(fullUrl);
    }
  });
};

const onSubmit = () => {
  const data = dataInput.value;

  if (!data.length) {
    return showInputError();
  }

  const color = mainColorPicker.value;
  const bgcolor = bgColorPicker.value;
  const size = sizeSlider.value;
  const qzone = marginSlider.value;
  const format = imageFormat.value;
  const parameters = prepareParameters({
    data,
    color,
    bgcolor,
    size,
    qzone,
    format,
  });

  getQrCode(parameters);
};

const addSubmitEventListener = () => {
  submitButton.addEventListener("click", onSubmit);
};

addSubmitEventListener();

const editButton = document.querySelector("#edit");

const onEdit = () => {
  settingsContainer.classList.remove("flipped");
  resultContainer.classList.remove("flipped");
};

const editButtonEventListener = () => {
  editButton.addEventListener("click", onEdit);
};

editButtonEventListener();
