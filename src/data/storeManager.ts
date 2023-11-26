class StoreManager {
  private static instance: StoreManager

  public static getInstance(): StoreManager {
    if (!StoreManager.instance) {
      StoreManager.instance = new StoreManager()
    }
    return StoreManager.instance
  }

  public setItem(key: string, value: any): void {
    localStorage.setItem(key, value)
  }

  public getItem(key: string): any {
    return localStorage.getItem(key)
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}

export { StoreManager }
