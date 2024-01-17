import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

import Order from "../views/order/OrderIndex.vue";
import OrderList from "../views/order/OrderList.vue";

import Book from "../views/book/BookIndex.vue";
import BookList from "../views/book/BookList.vue";
import BookInfo from "../views/book/BookInfo.vue";

import ShoppingCart from "../views/shoppingCart/ShoppingCartIndex.vue";
import ShoppingCartBar from "../views/shoppingCart/ShoppingCartBar.vue";
import ShoppingCartList from "../views/shoppingCart/ShoppingCartList.vue";
import ShoppingCartConfirm from "../views/shoppingCart/ShoppingCartConfirm.vue";
import ShoppingCartPay from "../views/shoppingCart/ShoppingCartPay.vue";
import ShoppingCartAppraisal from "../views/shoppingCart/ShoppingCartAppraisal.vue";

import Item from "../views/item/ItemIndex.vue";
import ItemList from "../views/item/ItemList.vue";
import AddItem from "../views/item/AddItem.vue";

import Adv from "../views/adv/AdvIndex.vue";
import AdvList from "../views/adv/AdvList.vue";
import AddAdv from "../views/adv/AddAdv.vue";
import PushAdv from "../views/adv/PushAdv.vue";
import UpdateAdv from "../views/adv/UpdateAdv.vue";

import KillBook from "../views/killBook/KillBookIndex.vue";
import KillBookList from "../views/killBook/KillBookList.vue";
import KillBookInfo from "../views/killBook/KillBookInfo.vue";
import KillBookPay from "../views/killBook/KillBookPay.vue";

import Food from "../views/food/FoodIndex.vue";
import FoodList from "../views/food/FoodList.vue";
import FoodPay from "../views/food/FoodPay.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/login",
		component: Login
	},
	{
		path: "/",
		component: Home,

		children: [
			{ path: "/", redirect: "/book" },
			{
				path: "/book",
				component: Book,
				children: [
					{
						path: "/",
						component: BookList
					},
					{
						path: "/bookInfo",
						component: BookInfo
					}
				]
			},
			{
				path: "/shoppingCart",
				component: ShoppingCart,
				children: [
					{
						path: "/",
						component: ShoppingCartBar,
						children: [
							{
								path: "/",
								component: ShoppingCartList
							},
							{
								path: "/shoppingCartConfirm",
								component: ShoppingCartConfirm
							},
							{
								path: "/shoppingCartPay",
								component: ShoppingCartPay
							},
							{
								path: "/shoppingCartAppraisal",
								component: ShoppingCartAppraisal
							}
						]
					}
				]
			},
			{
				path: "/order",
				component: Order,
				children: [
					{
						path: "/",
						component: OrderList
					}
				]
			},
			{
				path: "/item",
				component: Item,
				children: [
					{
						path: "/",
						component: ItemList
					},
					{
						path: "/addItem",
						component: AddItem
					}
				]
			},
			{
				path: "/adv",
				component: Adv,
				children: [
					{
						path: "/",
						component: AdvList
					},
					{
						path: "/addAdv",
						component: AddAdv
					},
					{
						path: "/pushAdv",
						component: PushAdv
					},
					{
						path: "/updateAdv",
						component: UpdateAdv
					}
				]
			},
			{
				path: "/killBook",
				component: KillBook,
				children: [
					{
						path: "/",
						component: KillBookList
					},
					{
						path: "/killBookInfo",
						component: KillBookInfo
					},
					{
						path: "/killBookPay",
						component: KillBookPay
					}
				]
			},
			{
				path: "/food",
				component: Food,
				children: [
					{
						path: "/",
						component: FoodList
					},
					{
						path: "/foodPay",
						component: FoodPay
					}
				]
			}
		]
	}
];

const router = new VueRouter({
	routes
});

export default router;
