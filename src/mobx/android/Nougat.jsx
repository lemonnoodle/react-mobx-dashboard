import { observable, action, runInAction, useStrict } from 'mobx';
import { searchJson, addNougats, getNougats } from '../../fetch/index';
useStrict(true);

class NougatStore {
    @observable data = [];
    @observable modalData = [];
    @observable jobDatas = [];
    @observable jobOptions = [];
    @observable createJobOptions = [];
    @observable suggestions = [];
    @observable searchResults = [];
    @observable loading = false;
    @observable params = {
        page: 1,
        page_size:10
    };
    @observable pagination = {
        showSizeChanger: true
    };

    @action addData = async (requestData) => {
        const param = {code: 'utf-8',q: 'naugat'};
        return await addNougats(param);
    }

    @action getDataSource = async (params) => {
        if (this.loading) {
            return;
        }
        this.loading = true;
        const param = Object.assign(params,{code: 'utf-8',q: 'fake'});
        const res = await getNougats(param);
        console.log(res);
        runInAction(() => {
            this.loading = false;
            this.data = [];
            this.pagination.total = 50;
            this.data.push({
                'key': 1,
                'id': 1,
                'name': 'Marshmallow',
                'mobile_os': 'palmOS',
                'search': 'search result',
                'create_time': '2050-1-1',
                'detail': 'I am a modal',
            })
        })
    }

    @action getJobOptions = async () => {
        const res = await jobDescriptions();
        runInAction(() => {
            this.jobDatas = [];
            this.jobOptions = [];
            this.createJobOptions = [];
            if (res.data !== null && res.code === 1) {
                const datas = res.data;
                this.jobDatas = datas;
                datas.forEach((r) => {
                    if (this.jobOptions.indexOf(r.type_name) === -1) {
                        this.jobOptions.push(r.type_name);
                    }
                    this.createJobOptions.push({
                        value: r.type_name,
                        text: r.name
                    })
                })
            }
        })
    }

    @action getSearchList = async (value) => {
        const param = {code: 'utf-8',q: value};
        const res = await searchJson(param);
        runInAction(() => {
            const result = res.result;
            this.searchResults = [];
            result.forEach((r) => {
                this.searchResults.push({
                    value: r[0],
                    text: r[0],
                });
            });
        })
    }

    @action getConstDes = async() => {
        const res = await constDescriptions();
        runInAction(() => {
            this.suggestions = [];
            if (res.data !== null && res.code === 1) {
                const datas = res.data;
                for (let i in datas) {
                    this.suggestions.push('{' + i + '}');
                }
            }
        })
    }
}

export default NougatStore;
