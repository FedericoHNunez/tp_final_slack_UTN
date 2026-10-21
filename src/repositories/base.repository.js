class BaseRepository {
    constructor(model, searchTerm = null) {
        this.model = model;
        this.searchTerm = searchTerm;
    }

    async getAll() {
        return await this.model.find();
    }

    async getByOneSearchTerm(term) {
        return await this.model.find({ [this.searchTerm]: { $regex: `${term}`, $options: 'i' } });
    }

    async getById(id) {
        return await this.model.findById(id);
    }

    async deleteById(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async updateById(id, updateData) {
        return await this.model.findByIdAndUpdate(
            id,
            updateData,
            { returnDocument: 'after' }
        );
    }
    async getByDateRange(startDate, endDate) {
        return await this.model.find({
            createdAt: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });
    }
}


export default BaseRepository;
