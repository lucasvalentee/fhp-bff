interface RegionModelProps {
  countryStateId: number | string;
  cityId: number | string;
}

class RegionModel {
  private countryStateId: number | string | undefined;

  private cityId: number | string | undefined;

  private static INSTANCE: RegionModel;

  public setCountryStateId(countryStateId: number | string) {
    this.countryStateId = countryStateId;
  }

  public getCountryStateId(): number | string | undefined {
    return this.countryStateId;
  }

  public setCityId(cityId: number | string) {
    this.cityId = cityId;
  }

  public getCityId(): number | string | undefined {
    return this.cityId;
  }

  public static getInstance(): RegionModel {
    if (!RegionModel.INSTANCE) {
      RegionModel.INSTANCE = new RegionModel();
    }

    return RegionModel.INSTANCE;
  }

  public setData({ countryStateId, cityId }: RegionModelProps): RegionModel {
    this.cityId = cityId;
    this.countryStateId = countryStateId;

    return RegionModel.INSTANCE;
  }
}

export default RegionModel;
