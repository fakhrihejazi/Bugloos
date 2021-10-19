using System;
using System.Threading.Tasks;
using bugloos.Core.Entities;

namespace bugloos.Core.Interfaces
{
    public interface IUnitOfWork: IDisposable
    {
        IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;
        Task<int> Complete();
         
    }
}