
using FamilyPlanner.Models.FamilyModel;

namespace FamilyPlanner.Services.Interfaces {
    public interface IFamilyService {
        public Task<Family> Create(Family family);
    }
}