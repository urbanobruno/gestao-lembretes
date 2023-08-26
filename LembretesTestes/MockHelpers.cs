using Moq;
using System.Collections.Generic;
using System.Linq;

using LembretesAPI.Models;
using LembretesAPI.Data;
using Microsoft.EntityFrameworkCore;


public static class MockHelpers
{
    public static Mock<TestingLembreteContext> CreateMockContext(List<Lembrete> lembretesFicticios)
    {

        var mockSet = new Mock<DbSet<Lembrete>>();

        mockSet.As<IQueryable<Lembrete>>().Setup(m => m.Provider).Returns(lembretesFicticios.AsQueryable().Provider);
        mockSet.As<IQueryable<Lembrete>>().Setup(m => m.Expression).Returns(lembretesFicticios.AsQueryable().Expression);
        mockSet.As<IQueryable<Lembrete>>().Setup(m => m.ElementType).Returns(lembretesFicticios.AsQueryable().ElementType);
        mockSet.As<IQueryable<Lembrete>>().Setup(m => m.GetEnumerator()).Returns(lembretesFicticios.AsQueryable().GetEnumerator());

        // Setup para os métodos utilizados no Controller - Add, Remove, Find
        mockSet.Setup(d => d.Add(It.IsAny<Lembrete>())).Callback<Lembrete>((s) => lembretesFicticios.Add(s));
        mockSet.Setup(d => d.Remove(It.IsAny<Lembrete>())).Callback<Lembrete>((s) => lembretesFicticios.Remove(s));
        mockSet.Setup(d => d.Find(It.IsAny<object[]>())).Returns<object[]>(ids => lembretesFicticios.FirstOrDefault(x => x.Id == (int)ids[0]));

        var mockContext = new Mock<TestingLembreteContext>();
        mockContext.Setup(c => c.Lembretes).Returns(mockSet.Object);

        return mockContext;
    }
}