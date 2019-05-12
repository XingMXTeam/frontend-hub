import hub from '../hub'
export default hub({
    name: 'order-v2-hub',
    data: {
        playCouponSelect: null
    },
    methods: {

    },
    events: [],
    methods: {
        pickCouponData: function () {
            // this.get('playCouponSelect')
        },
        otherMethod: function () {
            // 可以调用自身的方法
            // this.pickCouponData
        }
    }

})