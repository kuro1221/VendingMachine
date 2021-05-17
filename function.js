class Item {
  constructor(name, price, img) {
    this.name = name;
    this.price = price;
    this.img = img;
  }
}

class VendingMachine {
  constructor(items) {
    this.items = items;
    this.displayNum = 1;
    this.main = document.getElementById("main");
    this.extra = document.getElementById("extra");
    this.sliderList = this.createSliderList();
    this.createBtnList();
    this.setDefault();
  }

  //商品ボタンリストを作成
  createBtnList() {
    let btnContainer = document.getElementById("btnContainer");
    let self = this;
    for (let i = 0; i < this.items.length; i++) {
      let btn = document.createElement("button");
      btn.classList.add("selectBtn", "col-3", "btn", "btn-outline-secondary");
      btn.innerHTML = i + 1;

      btn.addEventListener("click", function () {
        self.pushBtn(i + 1);
      });
      btnContainer.append(btn);
    }
  }

  //画像のリストを作成し、配列に格納
  createSliderList() {
    let sliderList = [];
    for (let i = 0; i < this.items.length; i++) {
      let img = `<img class='img' src='${this.items[i].img}'>`;
      sliderList.push(img);
    }
    return sliderList;
  }

  //初期表示設定
  setDefault() {
    let displayNum = document.getElementById("displayNum");
    let displayName = document.getElementById("displayName");
    let displayPrice = document.getElementById("displayPrice");

    displayNum.innerHTML = 1;
    displayName.innerHTML = this.items[0].name;
    displayPrice.innerHTML = "¥" + this.items[0].price;

    this.main.innerHTML = this.sliderList[0];
  }

  //商品ボタンを押した時
  static pushBtn(pushNum) {
    let currNum = this.displayNum;
    let displayNum = document.getElementById("displayNum");
    let displayName = document.getElementById("displayName");
    let displayPrice = document.getElementById("displayPrice");
    let currElement = this.sliderList[currNum - 1];
    let nextElement = this.sliderList[pushNum - 1];

    //ディスプレイに表示
    this.displayNum = pushNum;
    displayNum.innerHTML = this.displayNum;
    displayName.innerHTML = this.items[pushNum - 1].name;
    displayPrice.innerHTML = "¥" + this.items[pushNum - 1].price;

    //現在表示の商品番号と押した番号を比べ、スライドの方向を決める
    if (currNum != pushNum) {
      currNum > pushNum
        ? this.animateMain(currElement, nextElement, "left")
        : this.animateMain(currElement, nextElement, "right");
    }
  }

  //スライドアニメーション
  animateMain(currElement, nextElement, type) {
    this.main.innerHTML = "";
    this.main.innerHTML = currElement;

    this.extra.innerHTML = "";
    this.extra.innerHTML = nextElement;

    this.main.classList.add("deplete-animation");
    this.extra.classList.add("expand-animation");

    if (type == "right") {
      imgDiv.innerHTML = "";
      imgDiv.append(this.main);
      imgDiv.append(this.extra);
    } else if (type == "left") {
      imgDiv.innerHTML = "";
      imgDiv.append(this.extra);
      imgDiv.append(this.main);
    }
  }
}

let items = [
  new Item(
    "cola",
    150,
    "https://images-na.ssl-images-amazon.com/images/I/514sWdpH8SL._AC_SL1000_.jpg"
  ),
  new Item(
    "tea",
    120,
    "https://images-na.ssl-images-amazon.com/images/I/71a71HTv2GL._AC_SL1500_.jpg"
  ),
  new Item(
    "coffee",
    100,
    "https://images-na.ssl-images-amazon.com/images/I/51L1NwRlp-L._AC_SL1000_.jpg"
  ),
  new Item(
    "orange",
    60,
    "https://images-na.ssl-images-amazon.com/images/I/81V-F%2BAxjEL._AC_SL1500_.jpg"
  ),
  new Item(
    "greentea",
    60,
    "https://images-na.ssl-images-amazon.com/images/I/71DrjLb-aEL._AC_SY741_.jpg"
  ),
];

let vendingMachine1 = new VendingMachine(items);
