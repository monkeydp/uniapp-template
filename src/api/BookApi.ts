import {Container, Singleton} from "typescript-ioc";
import BaseApi from './BaseApi';
import Book from "@/model/Book";
import Paging, {PagingQueryForm} from "biz-ts/src/api/Paging";

@Singleton
export default abstract class BookApi {

    abstract query(isbn: string): Promise<Book>

    abstract paging(form: PagingQueryForm): Promise<Paging<Book>>
}

class BookApiImpl extends BaseApi implements BookApi {

    protected urlPrefix = 'book'

    private mockBooks = [
        {
            id: '1',

            title: '思考致富',
            author: '(美) 拿破仑·希尔, 著',
            isbn: '9787544192552',
            summary: '《思考致富》是美国成功学家、作家拿破仑·希尔的代表作，被誉为人类历史上最优秀的励志著作之一。本书在作者20多年的亲身采访中逐渐完成，该书以其准确精炼的语言，揭示了成功的秘密，并提出了迈向成功的13个步骤。寻找书中获取财富的秘诀，展开一次奇特的阅读之旅，如果你希望这些秘诀为你所用，那么在字里行间你都会找到它们的蛛丝马迹，这些秘诀将带给你无穷的惊喜、激励、启迪和力量。原著作者拿破仑？希尔，美国人，全世界最早的现代成功学大师和励志书籍作家。译者黎夏，就读于北京师范大学心理系，专注于情绪、人格与人际交往等心理学领域研究。',
            picture: 'http://api.jisuapi.com/isbn/upload/c8/c693268f4ab7f5.jpg',
            publisher: '沈阳出版社',
        },
        {
            id: '2',

            title: '蔡康永的说话之道',
            author: '蔡康永',
            isbn: '9787540496470',
            summary: '《蔡康永的说话之道》是知名主持人蔡康永诠释“说话的艺术”的随笔集，旨在令“本来已经很讨人喜欢的你，在未来变得更讨人喜欢”。全书包括40篇精彩短文，通过研究“说话”令读者更加明确自己和别人的关系、自己和别人的思维逻辑，由此加深自我理解，提升生活幸福感。',
            picture: 'http://api.jisuapi.com/isbn/upload/a2/79d6af20bd7a39.jpg',
            publisher: '湖南文艺出版社',
        },
    ]

    async query(isbn: string): Promise<Book> {
        // return this.axios.get('query', {params: {isbn: isbn}})
        return this.mockBooks[0]
    }

    async paging(form: PagingQueryForm): Promise<Paging<Book>> {
        // return this.axios.get('paging', {params: form})
        const paging = new Paging<Book>()
        paging.total = this.mockBooks.length
        paging.pageCount = 1
        paging.rows = 2
        paging.content = this.mockBooks
        return paging
    }
}

Container.bind(BookApi).to(BookApiImpl)
