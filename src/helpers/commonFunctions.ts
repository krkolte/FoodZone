/**
 * All Commonly used functions will goes here
 */

import { MenuItemType, RestourantMenuListType } from "types/theme";

export const getSectionedMenuWithCuisine = (menuList: any = []) => {
   return [
        {
          title: 'North Indian',
          id: 1,
          data: menuList,
        },
        {
          title: 'Italian',
          id: 2,
          data: menuList,
        },
        {
          title: 'Thai & Chienese',
          id: 3,
          data: menuList,
        },
        {
          title: 'Desserts',
          id: 4,
          data: menuList,
        },
        {
            title: 'Drinks',
            id: 5,
            data: menuList,
        }
      ];
}

export const getAlteredMenuListForItemSelection = (menuList: RestourantMenuListType = [], sectionId: string | number = 1, itemId : string | number = 1, newCount = 1) => {
  const newList = menuList?.map((section) => {
    let newData = null;
    if(section?.id === sectionId) {
      newData = section?.data?.map((itemData) => {
        let _data = {
          ...itemData,
          itemsAdded: itemData?.itemsAdded ? itemData?.itemsAdded : 0,
        }
        if(itemData?.id == itemId) {
          _data = {
            ..._data,
            itemsAdded: newCount,
          }
        }
        return _data;
      })
    }
    return {
      ...section,
      data: newData ? newData : section?.data,
    };
  })
  return newList;
}

export const isAnyMenuItemAdded = (menuList: RestourantMenuListType = []) => {
  let isAnyAdded = false;
  menuList?.map((section) => {
    section?.data?.map((itemData) => {
      if(itemData?.itemsAdded > 0) {
        isAnyAdded = true;
        return;
      }
    })
  })
  return isAnyAdded;
}

export const getSelectedMenuItems = (menuList: RestourantMenuListType = []) => {
  let selectedMenuItems: Array<MenuItemType> = [];
  menuList?.map((section) => {
    section?.data?.map((itemData) => {
      if(itemData?.itemsAdded > 0) {
        selectedMenuItems?.push(itemData);
      }
    })
  })
  return selectedMenuItems;
}

export const getCheckoutAmountData = (selectedItems: Array<MenuItemType>) => {
  let totalVal = 0.0;
  selectedItems?.map((item) => {
    totalVal = totalVal + (parseFloat(item?.price) * item?.itemsAdded);
  })
  const tax = (totalVal * 12) / 100;
  return {
    total: totalVal,
    shippingFee: 80,
    tax: tax,
    finalAmount: totalVal + 80 + tax,
  }
}