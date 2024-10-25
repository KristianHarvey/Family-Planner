
using AutoMapper;
using FamilyPlanner.Models.UserModel;

public class MappingProfile : Profile {
    public MappingProfile() {
        CreateMap<User, UserDTO>();
        CreateMap<UserDTO, User>();
    }

}
