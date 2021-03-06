/**
 * Created by python on 19-1-22.
 */
var vm = new Vue({
    el: '#app',
    // delimiters: ['[[', ']]'], // 修改vue模板符号，防止与django冲突
    data: {
        host: host,

        page: 1, // 当前页数
        page_size: 2, // 每页数量
        // ordering: '-create_time', // 排序
        id: '',  //当前分类id
        count: 0,  // 文章总数量
        articles: [], // 文章数据
        categories: [], // 文章类别
    },
    computed: {
        total_page: function () {  // 总页数
            return Math.ceil(this.count / this.page_size);
        },

        next: function () {  // 下一页
            if (this.page >= this.total_page) {
                return 0;
            } else {
                return this.page + 1;
            }
        },
        previous: function () {  // 上一页
            if (this.page <= 0) {
                return 0;
            } else {
                return this.page - 1;
            }
        },
        page_nums: function () {  // 页码
            // 分页页数显示计算
            // 1.如果总页数<=5
            // 2.如果当前页是前3页
            // 3.如果当前页是后3页,
            // 4.既不是前3页，也不是后3页
            var nums = [];
            if (this.total_page <= 5) {
                for (var i = 1; i <= this.total_page; i++) {
                    nums.push(i);
                }
            } else if (this.page <= 3) {
                nums = [1, 2, 3, 4, 5];
            } else if (this.total_page - this.page <= 2) {
                for (var i = this.total_page; i > this.total_page - 5; i--) {
                    nums.push(i);
                }
            } else {
                for (var i = this.page - 2; i < this.page + 3; i++) {
                    nums.push(i);
                }
            }
            return nums;
        }
    },
    mounted: function () {
        this.id = this.get_query_string('id');  //初始化获取保存当前分类id
        // 获取文章数据
        axios.get(this.host + '/cat_articles/?id='+this.id, {
            responseType: 'json'
        })
            .then(response => {
                this.count = response.data.count;
                this.articles = response.data.results;
            })
            .catch(error => {
                console.log(error.response.data)
            });

        //获取文章类别
        axios.get(this.host + '/categories/', {
            responseType: 'json'
        })
            .then(response => {
                this.categories = response.data;
            })
            .catch(error => {
                console.log(error.response.data)
            });

    },
    methods: {

        // 获取url路径参数
        get_query_string: function (name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return decodeURI(r[2]);
            }
            return null;
        },

        // 点击页数
        on_page: function(num){
            if (num != this.page){
                this.page = num;
                this.get_articles();
            }
        },

        //选择类别文章列表数据
        get_cat_articles: function (id) {

            axios.get(this.host + '/cat_articles/?id='+id, {
            responseType: 'json'
        })
            .then(response => {
                this.id = id;  // 更新当前页面类别id
                this.count = response.data.count;  // 更新类别文章数据量
                this.articles = response.data.results;
            })
            .catch(error => {
                console.log(error.response.data)
            });
        },


        // 请求文章列表数据
        // http://127.0.0.1:8000/cat_articles?id=1&page=1
        get_articles: function () {
            let config = {
                params: {
                    id: this.id,
                    page: this.page,  //当前页面
                    // ordering: this.ordering
                },
            };
            axios.get(this.host + '/cat_articles/', config)
                .then(response => {
                    this.count = response.data.count;
                    this.articles = response.data.results;

                })
                .catch(error => {
                    console.log(error.response.data);
                })
        },

    }
});



