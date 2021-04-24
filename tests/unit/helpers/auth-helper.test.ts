import AuthHelper from "@/helpers/auth-helper";
import Cookies from 'universal-cookie';

test("should get header", () => {
    const cookies = new Cookies();
    const token = "123.123.123";
    cookies.set("accessToken", token);

    // Act
    const header = AuthHelper.header;

    // Assert
    expect(header).toBe(`Bearer ${token}`);
});

test("should set tokens", () => {
    // Act
    AuthHelper.tokens = {
        uid: "1",
        tokens: {
            access: "123.123.123",
            refresh: "456.456.456",
        }
    };

    // Assert
    const cookies = new Cookies();
    expect(cookies.get("accessToken")).toBe("123.123.123");
    expect(cookies.get("refreshToken")).toBe("456.456.456");
    expect(cookies.get("uid")).toBe("1");
});

test("should get tokens body", () => {
    const cookies = new Cookies();
    cookies.set("accessToken", "123.123.123");
    cookies.set("refreshToken", "456.456.456");
    cookies.set("uid", "1");

    expect(AuthHelper.tokensBody).toEqual({
        tokens: {
            access: "123.123.123",
            refresh: "456.456.456",
        },
        uid: "1",
    });
});

test("should destroy tokens", () => {
    const cookies = new Cookies();
    cookies.set("accessToken", "123.123.123");
    cookies.set("refreshToken", "456.456.456");
    cookies.set("uid", "1");

    // Act
    AuthHelper.destroyTokens();

    // Assert
    expect(cookies.get("accessToken")).toBeFalsy();
    expect(cookies.get("accessToken")).toBeFalsy();
    expect(cookies.get("uid")).toBeFalsy();
});

test("should get uid", () => {
    const cookies = new Cookies();
    cookies.set("uid", "1");

    expect(AuthHelper.uid).toEqual(1);
})


