/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginUser(username: string, password: string): Chainable<any>

    loginCustomer(username: string, password: string): Chainable<any>

    getMerchantCategories(
      merchantSlug: string,
      status: "Active" | "Inactive" | "All"
    ): Chainable<any>

    updateMerchantCategory(
      categoryBvid: string,
      isActive: boolean,
      token: string,
      name?: string
    ): Chainable<any>

    updateMerchantCategoryOrder(
      categoriesSortOrder: any,
      token: string
    ): Chainable<any>

    updateMerchantProduct(
      mainOptionBvid: string,
      isActive: boolean,
      token: string,
      isMultiSelect?: boolean
    ): Chainable<any>

    createStoreTimings(storeTimings: any, token: string): Chainable<any>

    resetStoreTimings(bvid: string, token: string): Chainable<any>

    createDeliveryTimings(deliveryTimings: any, token: string): Chainable<any>

    updateDeliveryTimings(deliveryTimings: any, token: string): Chainable<any>

    resetDeliveryTimings(bvid: string, token: string): Chainable<any>

    updateMerchantProfile(
      uid: string,
      token: string,
      showAddress?: Boolean
    ): Chainable<any>

    updateMerchantConfig(
      token: string,
      whatsappPhoneNumber?: string
    ): Chainable<any>

    MultiClick(element: string, times: number): Chainable<any>

    getIframe(): Chainable<any>

    updateMainOption(
      mainOptionBvid: any,
      isActive: Boolean,
      token: string
    ): Chainable<any>

    updateMainOptionValue(
      mainOptionValueBvid: any,
      isActive: Boolean,
      token: string
    ): Chainable<any>

    updateSubOption(
      mainOptionBvid: any,
      isActive: Boolean,
      token: string
    ): Chainable<any>

    updateSubOptionValue(
      mainOptionValueBvid: any,
      isActive: Boolean,
      token: string
    ): Chainable<any>
  }
}
