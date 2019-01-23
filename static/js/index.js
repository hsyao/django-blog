/**
 * Created by python on 19-1-22.
 */
var vm = new Vue({
    el: '#app',
    // delimiters: ['[[', ']]'], // 修改vue模板符号，防止与django冲突
    data: {
        host: host,

        cat: '', // 文章类别
        page: 1, // 当前页数
        page_size: 5, // 每页数量
        ordering: '-create_time', // 排序

        count: 0,  // 文章总数量
        articles: [], // 文章数据

        tags: [], // 标签
        hots: [], // 热门文章
    },
    computed: {
        total_page: function(){  // 总页数
            return Math.ceil(this.count/this.page_size);
        },
        next: function(){  // 下一页
            if (this.page >= this.total_page) {
                return 0;
            } else {
                return this.page + 1;
            }
        },
        previous: function(){  // 上一页
            if (this.page <= 0 ) {
                return 0;
            } else {
                return this.page - 1;
            }
        },
        page_nums: function(){  // 页码
            // 分页页数显示计算
            // 1.如果总页数<=5
            // 2.如果当前页是前3页
            // 3.如果当前页是后3页,
            // 4.既不是前3页，也不是后3页
            var nums = [];
            if (this.total_page <= 5) {
                for (var i=1; i<=this.total_page; i++){
                    nums.push(i);
                }
            } else if (this.page <= 3) {
                nums = [1, 2, 3, 4, 5];
            } else if (this.total_page - this.page <= 2) {
                for (var i=this.total_page; i>this.total_page-5; i--) {
                    nums.push(i);
                }
            } else {
                for (var i=this.page-2; i<this.page+3; i++){
                    nums.push(i);
                }
            }
            return nums;
        }
    },
    mounted: function(){
        this.cat = this.get_query_string('cat'); // 115
        // this.get_skus();

        // 获取文章数据
        axios.get(this.host+'/articles/' , {
                responseType:'json'
            })
            .then(response => {
                this.count=response.data.count;
                this.articles = response.data.results;
            })
            .catch(error => {
                console.log(error.response.data)
            });


        // this.get_cart();
        // this.get_hot_goods();
    },
    methods: {

        // 获取url路径参数
        get_query_string: function(name){
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        },

        // 请求商品列表数据
        // http://api.meiduo.site:8000/skus/?category_id=115&ordering=-price
        get_skus: function () {
             let config = {
                    params: {
                        category_id: this.cat,
                        page: this.page,
                        page_size: this.page_size, // 5
                        ordering: this.ordering
                    },
                };
            axios.get(this.host + '/skus/', config)
                .then(response => {
                    this.count = response.data.count;
                    this.skus = response.data.results;

                    // 给每个商品sku指定了, 访问sku详情界面的url地址
                    for (var i = 0; i < this.skus.length; i++) {
                        // 进入商品详情界面的链接地址:  /goods/1.html
                        this.skus[i].url = '/goods/' + this.skus[i].id + ".html";
                    }
                })
                .catch(error => {
                    console.log(error.response.data);
                })
        },

    }
});